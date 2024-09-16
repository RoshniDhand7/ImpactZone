import { RadioButton } from 'primereact/radiobutton';
import _ from 'lodash';

export function CustomRadioButtons({
    label,
    name,
    onChange,
    data,
    value,
    errorMessage,
    extraClassName,
    required,
    col,
    inputClass,
    options,
    optionLabel,
    ...props
}) {
    return (
        <div className="flex gap-3 mb-2 ">
            {options.map((item, i) => (
                <div key={i} className={`flex align-items-center`}>
                    <RadioButton
                        value={item?.value}
                        onChange={(e) => onChange && onChange({ ...e, name, value: e.value })}
                        checked={_.isEqual(value || data?.[name], item?.value)}
                        inputId={item.name}
                        name={item.name}
                        {...props}
                    />
                    &nbsp;&nbsp;
                    <label className="" htmlFor={item.name}>
                        {optionLabel ? item[optionLabel] : item?.name}
                    </label>
                </div>
            ))}
        </div>
    );
}
