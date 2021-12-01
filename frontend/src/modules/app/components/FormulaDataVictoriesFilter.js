import Container from "react-bootstrap/Container";
import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useIntl} from "react-intl";
import backend from "../../../backend";
import Pager from "../../commons/components/Pager"
import FormulaDataVictoriesResultPage from "./FormulaDataVictoriesResultPage";

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
    const size = 10

    const intl = useIntl()

    const processParam = (value) => {
        if(value === ""){
            return "*"
        }else{
            return value
        }
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
                </Form>

            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div className={"formulaData_tableDiv"}>
                <h4 className={"centeredParagraph"}>Resultado</h4>
                <hr/>
                <FormulaDataVictoriesResultPage data={grandesPremios}/>
                {
                    grandesPremios !== null?
                        <Pager
                            back={{
                                enabled: page > 1,
                                onClick: () => setPage(page-1)
                            }}
                            next={{
                                enabled: grandesPremios.length >= 10,
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