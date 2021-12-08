import Container from "react-bootstrap/Container";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {FormattedMessage, useIntl} from "react-intl";
import backend from "../../../backend";
import Pager from "../../commons/components/Pager"
import FormulaDataVictoriesResultPage from "./FormulaDataVictoriesResultPage";
import { Link } from "react-router-dom";

const FormulaDataVictoriesFilter = () => {

    // Variables para filtrado
    const [granPremio, setGranPremio] = useState("")
    const [nombre, setNombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [iniciales, setIniciales] = useState("")
    const [equipo, setEquipo] = useState("")
    const [fechaDesde, setFechaDesde] = useState("")
    const [fechaHasta, setFechaHasta] = useState("")

    // Variables para resultado
    const [grandesPremios, setGrandesPremios] = useState(null)

    // Paginacion
    const [page, setPage] = useState(1)
    const size = 15

    // Facetado

    const [facetado, setFacetado] = useState(false)

    const intl = useIntl()

    const processParam = (value) => {
        if(value === ""){
            return "*"
        }else{
            return value
        }
    }

    const datosTabla = () => {
        if(grandesPremios != null){
            return grandesPremios.resultadoBusqueda
        }else{
            return null
        }
    }

    const crearListaFacetado = () => {
        var listaLinks = [];
        var tamañoResultadoFacetado = grandesPremios.resultadoFacetado.length

        for (let i = 0; i < tamañoResultadoFacetado; i++) {
            const element = grandesPremios.resultadoFacetado[i];
            var textoLink = `${element.apellido} ${element.ocurrencias}`
            if(i !== tamañoResultadoFacetado-1){
                textoLink= textoLink.concat(", ")
            } else {
                textoLink= textoLink.concat(" ")
            }
            var link = <Link onClick={() => buscarPorFacetado(element.apellido, true)}>{textoLink}</Link>
            listaLinks.push(link)

        }

        if(facetado){
            listaLinks.push(
                <Link className={"botonCancelarFacetado"} onClick={() => buscarPorFacetado("", false)} variant="danger">x</Link>
            )
        }


        return listaLinks
    }

    // Paginacion
    useEffect(() =>{
        // Solo si se ha buscado algo con anterioridad
        if(grandesPremios !== null){
            backend.userService.findGps(
                {
                    granPremio : processParam(granPremio),
                    nombre : processParam(nombre),
                    apellido : processParam(apellido),
                    iniciales : processParam(iniciales),
                    equipo : processParam(equipo),
                    fechaDesde : processParam(fechaDesde),
                    fechaHasta : processParam(fechaHasta),
                    page,
                    size
                },
                gps => setGrandesPremios(gps),
                gps => null
            )
        }
    },[page])

    const handleSubmit = (event) => {


        event.preventDefault()
        
        // Se reestablece la página a 1 por si había búsquedas anteriores
        setPage(1)

        backend.userService.findGps(
            {
                granPremio : processParam(granPremio),
                nombre : processParam(nombre),
                apellido : processParam(apellido),
                iniciales : processParam(iniciales),
                equipo : processParam(equipo),
                fechaDesde : processParam(fechaDesde),
                fechaHasta : processParam(fechaHasta),
                page,
                size
            },
            gps => setGrandesPremios(gps),
            gps => null
        )
    }

    // Se puede entrar a este método de dos maneras:
    //  1) Al clickar en uno de los links del facetado, poniento facetado a true
    //  2) Al desactivar el facetado, poniendo facetado a false
    const buscarPorFacetado = (apellido, facetado) => {
        
        // Se reestablece la página a 1 por si había búsquedas anteriores
        setPage(1)
        setApellido(apellido)
        setFacetado(facetado)

        backend.userService.findGps(
            {
                granPremio : processParam(granPremio),
                nombre : processParam(nombre),
                apellido : processParam(apellido),
                iniciales : processParam(iniciales),
                equipo : processParam(equipo),
                fechaDesde : processParam(fechaDesde),
                fechaHasta : processParam(fechaHasta),
                page,
                size
            },
            gps => setGrandesPremios(gps),
            gps => null
        )
    }

    return(
        <Container className={"centeredHorizontalDiv"}>
            <div className={"formulaData_filterDiv"}>
                <h4 className={"centeredParagraph"}>Filtrado</h4>
                <hr/>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            {intl.formatMessage({id: 'formulaData.grandesPremios.filter.pais'})}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={intl.formatMessage
                                            ({id: 'formulaData.grandesPremios.filter.pais.placeholder'})}
                            value={granPremio}
                            onChange={event => setGranPremio(event.target.value)}
                            maxlength={50}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            {intl.formatMessage({id: 'formulaData.grandesPremios.filter.driver.name'})}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={intl.formatMessage
                                            ({id: 'formulaData.grandesPremios.filter.driver.name.placeholder'})}
                            value={nombre}
                            onChange={event => setNombre(event.target.value)}
                            maxlength={50}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            {intl.formatMessage({id: 'formulaData.grandesPremios.filter.driver.surname'})}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={intl.formatMessage
                            ({id: 'formulaData.grandesPremios.filter.driver.surname.placeholder'})}
                            value={apellido}
                            onChange={event => setApellido(event.target.value)}
                            maxlength={50}
                        />

                    {
                        grandesPremios != null?
                            <div>
                                {intl.formatMessage({id: 'formulaData.apellidos'})}
                                &nbsp;
                                {crearListaFacetado()}
                            </div>
                            
                        
                            :

                            null
                    }
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            {intl.formatMessage({id: 'formulaData.grandesPremios.filter.driver.initials'})}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={intl.formatMessage
                            ({id: 'formulaData.grandesPremios.filter.driver.initials.placeholder'})}
                            value={iniciales}
                            onChange={event => setIniciales(event.target.value)}
                            maxlength={3}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>
                            {intl.formatMessage({id: 'formulaData.grandesPremios.filter.team'})}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder={intl.formatMessage
                            ({id: 'formulaData.grandesPremios.filter.team.placeholder'})}
                            value={equipo}
                            onChange={event => setEquipo(event.target.value)}
                            maxlength={50}
                        />
                    </Form.Group>
                    <div>
                        <label>
                            {intl.formatMessage({id: 'formulaData.grandesPremios.filter.driver.date.from'})}
                        </label>
                        <br/>
                        <input
                            type="date"
                            value={fechaDesde}
                            onChange={event => setFechaDesde(event.target.value)}
                        />
                    </div>
                    <br/>
                    <div>
                        <label>
                            {intl.formatMessage({id: 'formulaData.grandesPremios.filter.driver.date.to'})}
                        </label>
                        <br/>
                        <input
                            type="date"
                            value={fechaHasta}
                            onChange={event => setFechaHasta(event.target.value)}
                        />
                    </div>
                    <br/>
                    <div className={"center"}>
                        <Button type={"submit"} variant={"success"}>
                            {intl.formatMessage({id: 'formulaData.grandesPremios.filter.search'})}
                        </Button>
                    </div>
                    <br/><br/><br/><br/>
                </Form>

            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className={"formulaData_tableDiv"}>
                <h4 className={"centeredParagraph"}>Resultado</h4>
                <hr/>
                <FormulaDataVictoriesResultPage data={datosTabla()}/>
                {
                    grandesPremios !== null?
                        <Pager
                            back={{
                                enabled: page > 1,
                                onClick: () => setPage(page-1)
                            }}
                            next={{
                                enabled: grandesPremios.resultadoBusqueda.length >= size,
                                onClick: () => setPage(page+1)
                            }}
                        />

                        
                    :
                        null
                }
                
            </div>
        </Container>
    )
}

export default FormulaDataVictoriesFilter