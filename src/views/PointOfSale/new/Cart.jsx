import React from 'react';
import CustomCard from '../../../shared/Cards/CustomCard';
import PrimaryButton, { CustomButton } from '../../../shared/Button/CustomButton';
import { confirmPopup } from 'primereact/confirmpopup';

export default function Cart({ cartItems, setCartItems }) {
    const onDeleteCartItem = (product) => {
        setCartItems((prev) => {
            let _items = prev.filter((item) => item?._id !== product._id);
            return [..._items];
        });
    };
    return (
        <CustomCard title="Cart" col={12}>
            {cartItems?.map((item) => (
                <CartItem item={item} onDeleteCartItem={onDeleteCartItem} />
            ))}
            <CartDetails />
        </CustomCard>
    );
}

function CartItem(props) {
    let item = props.item;
    const onDelete = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to delete this item?',
            icon: 'pi pi-info-circle',
            rejectClassName: 'p-button p-button-outlined p-button-secondary',
            acceptClassName: 'btn-dark',
            defaultFocus: 'reject',
            accept: () => {
                props.onDeleteCartItem(item);
            },
            reject: () => {},
        });
    };
    const onWaiveTax = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Do you want to waive tax on this item?',
            icon: 'pi pi-info-circle',
            rejectClassName: 'p-button p-button-outlined p-button-secondary',
            acceptClassName: 'btn-dark',
            defaultFocus: 'reject',
            accept: () => {},
            reject: () => {},
        });
    };
    return (
        <div>
            <div className="flex justify-content-between text-xl font-medium">
                <div>{item?.name}</div>
                <div>$180</div>
            </div>
            <div className="text-dark-gray">{item?.itemCaption}</div>
            <div className="flex justify-content-between">
                <div className="flex">
                    <div className="mr-2 text-lg font-medium my-auto">${item?.unitPrice}</div>
                    <div className="mr-2 text-lg font-medium line-through text-dark-gray my-auto">${item?.unitPrice}</div>
                    <div className="bg-green-100 text-green-900 border-round-sm px-1 my-auto">10% OFF</div>
                </div>

                {/* <div className="flex gap-2 align-items-center border-1 border-400 border-round-md px-3"> */}
                <div className="flex gap-2 align-items-center">
                    <i className={`pi pi-minus-circle text-xl text-gray-400 text-red-600 `}></i>
                    <div className="text-xl font-medium">2</div>
                    <i className={`pi pi-plus-circle text-xl text-gray- text-green-600`}></i>
                </div>
            </div>
            <div className="flex justify-content-between my-3 ">
                <div className="flex">
                    <div className="py-1 px-3 border-400 border-round-md mr-2 border-1 cursor-pointer">
                        <i className="pi pi-dollar"></i>
                        Overwrite Discount
                    </div>
                    <div className="py-1 px-3 bg-primary-dark border-round-md mr-2 text-white cursor-pointer" onClick={onWaiveTax}>
                        % Waive Tax
                    </div>
                </div>

                <div className="py-1 px-2 bg-red-100 border-round-md cursor-pointer" onClick={onDelete}>
                    <i className="pi pi-trash text-xl text-red-600"></i>
                </div>
            </div>
            <hr />
            <br />
        </div>
    );
}
function CartDetails() {
    return (
        <div>
            <div className="text-xl font-medium mb-2">
                <div>Pricing Detail</div>
            </div>
            <div className="flex justify-content-between">
                <div className="text-dark-gray">Discounts:</div>
                <div className="font-medium text-green-600">$2.00</div>
            </div>
            <div className="flex justify-content-between">
                <div className="text-dark-gray">Tax:</div>
                <div className="font-medium ">$2.00</div>
            </div>
            <div className="flex justify-content-between">
                <div className="text-dark-gray">Total:</div>
                <div className="font-medium ">$2.00</div>
            </div>
            <div className="flex justify-content-between">
                <div className="text-dark-gray">Account Balance:</div>
                <div className="font-medium text-red-600">$2.00</div>
            </div>
            <div className="flex justify-content-between">
                <div className="text-dark-gray">Final Total:</div>
                <div className="font-medium ">$2.00</div>
            </div>
            <div className="flex justify-content-between bg-white py-2 px-3 border-round-md text-lg my-2 ">
                <div className="text-dark-gray">Pre-Pay Balance</div>
                <div className="font-medium text-green-600">$2.00</div>
            </div>
            <div className="flex justify-content-between bg-white py-2 px-3 border-round-md text-lg my-2  ">
                <div className="text-dark-gray">Apply Promocode</div>
                <div className="font-medium text-green-600">$2.00</div>
            </div>
            <div className="flex gap-2 mt-2">
                <PrimaryButton label="Checkout" className="w-full" />
                <CustomButton label="Save" severity="secondary" className="w-full" />
            </div>
            <div className="flex gap-2 mt-2">
                <CustomButton className="w-full px-2" label="No Sale" severity="secondary" />
                <PrimaryButton className="w-full px-1" label="Quick Cash" />
                <PrimaryButton className="w-full px-2" label="Pre-Pay" />
                <PrimaryButton className="w-full px-1" label="Card File" />
            </div>
        </div>
    );
}
