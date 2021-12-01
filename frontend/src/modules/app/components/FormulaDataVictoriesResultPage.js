import {Alert} from "react-bootstrap";
import {useIntl} from "react-intl";
import FormulaDataVictoriesResultTable from "./FormulaDataVictoriesResultTable";

const FormulaDataVictoriesResultPage = (grandesPremios) => {

    const intl = useIntl()

    if(grandesPremios.data === null){
        return(
            <Alert variant={"primary"}>
                {intl.formatMessage({id: 'formulaData.grandesPremios.table.doQuery'})}
            </Alert>
        )
    }

    if(grandesPremios.data.length === 0){
        return(
            <Alert variant={"warning"}>
                {intl.formatMessage({id: 'formulaData.grandesPremios.table.noResults'})}
            </Alert>
        )
    }

    return(
        <FormulaDataVictoriesResultTable grandesPremios={grandesPremios.data}/>
    )



}

export default FormulaDataVictoriesResultPage