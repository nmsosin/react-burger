import { React } from 'react';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import checkPropTypes from "../../utils/prop-types";

const BurgerConstructor = (props) => {
  const { openModal } = props;

  const handleOrderButtonClick = (evt) => {
    console.log(evt.currentTarget);
    openModal();
  }

  return (
    <section className="pt-25 pl-8 pr-4">
      <div  className={burgerConstructorStyles.constructorContainer}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
        />
        <div className={`pr-4 ${burgerConstructorStyles.optionalIngredientsContainer}`}>
          <div className={burgerConstructorStyles.constructorElementContainer}>
            <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary" /></span>
          <ConstructorElement
            text="Говяжий метеорит (отбивная)"
            price={50}
            thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
          />
          </div>
          <div className={burgerConstructorStyles.constructorElementContainer}>
            <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary" /></span>
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            />
          </div>
          <div className={burgerConstructorStyles.constructorElementContainer}>
            <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary" /></span>
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            />
          </div>
          <div className={burgerConstructorStyles.constructorElementContainer}>
            <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary" /></span>
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            />
          </div>
          <div className={burgerConstructorStyles.constructorElementContainer}>
            <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary" /></span>
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            />
          </div>
          <div className={burgerConstructorStyles.constructorElementContainer}>
            <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary" /></span>
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            />
          </div>
          <div className={burgerConstructorStyles.constructorElementContainer}>
            <span className={`pr-2 ${burgerConstructorStyles.dragIcon}`}><DragIcon type="primary" /></span>
            <ConstructorElement
              text="Говяжий метеорит (отбивная)"
              price={50}
              thumbnail={"https://code.s3.yandex.net/react/code/meat-01.png"}
            />
          </div>
        </div>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          extraClass={`ml-8 mr-6 ${burgerConstructorStyles.fixed}`}
        />
      </div>
      <div className={`pt-10 ${burgerConstructorStyles.orderTotal}`}>
        <div className={burgerConstructorStyles.price}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={handleOrderButtonClick} >
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  content: PropTypes.arrayOf(checkPropTypes)
}