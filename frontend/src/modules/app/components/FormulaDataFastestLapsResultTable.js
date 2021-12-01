import {FormattedDate, FormattedMessage} from "react-intl";

const FormulaDataVictoriesResultTable = ({grandesPremios}) => {

    return (
        <table className="table table-striped table-hover" >
            <thead>
            <tr>
                <th scope="col">
                    <FormattedMessage id='formulaData.grandesPremios.items.granPremio'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='formulaData.grandesPremios.items.tiempo'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='formulaData.grandesPremios.items.nombre'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='formulaData.grandesPremios.items.apellido'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='formulaData.grandesPremios.items.iniciales'/>
                </th>
                <th scope="col">
                    <FormattedMessage id='formulaData.grandesPremios.items.equipo'/>
                </th>
            </tr>
            </thead>

            <tbody>
            {grandesPremios.map(gp =>
                <tr key={gp.id}>
                    <td>
                        {gp.granPremio_fl}
                    </td>
                    <td>
                        {gp.tiempo_fl}
                    </td>
                    <td>
                        {gp.nombre_fl}
                    </td>
                    <td>
                        {gp.apellido_fl}
                    </td>
                    <td>
                        {gp.iniciales_fl}
                    </td>
                    <td>
                        {gp.equipo_fl}
                    </td>
                </tr>
            )}
            </tbody>

        </table>
    )
}

export default FormulaDataVictoriesResultTable;