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
                    <FormattedMessage id='formulaData.grandesPremios.items.fecha'/>
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
                        {gp.granPremio}
                    </td>
                    <td>
                        <FormattedDate value={new Date(gp.fecha)}/>
                    </td>
                    <td>
                        {gp.nombre}
                    </td>
                    <td>
                        {gp.apellido}
                    </td>
                    <td>
                        {gp.iniciales}
                    </td>
                    <td>
                        {gp.equipo}
                    </td>
                </tr>
            )}
            </tbody>

        </table>
    )
}

export default FormulaDataVictoriesResultTable;