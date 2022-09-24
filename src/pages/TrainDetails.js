
import TrainList from "../components/TrainList";
import BaseLayout from "../utils/BaseLayout";


const TrainDetails = () => {


    return <BaseLayout children={<TrainList />} active="trains" />
}

export default TrainDetails;
