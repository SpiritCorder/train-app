
import AddTrainForm from "../components/AddTrainForm";
import BaseLayout from "../utils/BaseLayout";

import './addNewTrain.css';

const AddNewTrain = () => {


    return (
        <BaseLayout children={<AddTrainForm />} />
    );
}

export default AddNewTrain;