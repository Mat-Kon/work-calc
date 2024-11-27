import st from './index.module.scss';
import { type NextPage } from 'next';
import { CalcSelect } from '@/features/calculate';
import { TextInput } from '@/shared/inputs';
import { PopupWrapper } from '@/shared/popup-wrapper';
import { BaseBtn } from '@/shared/buttons/base/ui';

//TODO: change when add db
const servesTypes = ['Монтаж пола', 'Отделка стен', 'Установка окна'];
const typeValues = ['п.м', 'м2', 'за услугу'];

const Calculate: NextPage = () => {
  // const handleClickAdd: MouseEventHandler<HTMLButtonElement> = (event) => {
  //   console.log(event);
  // };

  return (
    <div className={st.calc}>
      <h1 className={st.heading}>Расчет стоимости</h1>

      <nav className={st.calc__toolbar}>
        <button className={st.calc__add} popoverTarget="po">
          Добавить услугу
        </button>
      </nav>

      <PopupWrapper id="po">
        <div>
          <CalcSelect
            name="typeService"
            id="typeService"
            optionValues={servesTypes}
            defaultValue={servesTypes[0]}
          />

          <CalcSelect
            name="typeValue"
            id="typeValue"
            optionValues={typeValues}
            defaultValue={typeValues[0]}
          />
          <TextInput name="serviceValue" />
          <BaseBtn text="Добавить" className={st.popup__btn} popoverTarget="po" />
        </div>
      </PopupWrapper>
    </div>
  );
};

export default Calculate;
