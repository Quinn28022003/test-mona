import './field-text.scss';

interface IFieldText {
    label: string;
    value: string;
}
const FieldText = (props: IFieldText) => {
    const { label, value } = props;
    return (
        <div className='container'>
            <div className='left'>
                {label}:
            </div>

            <div className='right'>
                {value}
            </div>
        </div>
    )
}

export default FieldText