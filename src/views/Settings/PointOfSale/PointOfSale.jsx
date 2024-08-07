import CustomTabView from '../../../shared/TabView/CustomTabView';
import Discount from './Discount/Discount';
import PaymentMethods from './PaymentMethods/PaymentMethods';
import Tax from './Tax/Tax';

const PointOfSaleSetUp = () => {
    const tabs = [
        { title: 'Tax', content: <Tax /> },
        { title: 'Payment Methods', content: <PaymentMethods /> },
        { title: 'Discount', content: <Discount /> },
    ];
    return <CustomTabView tabs={tabs} />;
};
export default PointOfSaleSetUp;
