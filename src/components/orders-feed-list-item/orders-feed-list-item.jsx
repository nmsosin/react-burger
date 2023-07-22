import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

export function OrdersFeedListItem () {

  return(
    <section>
      <div>
        <p>#034535</p>
        <p>Death Star Starship Main Burger</p>
        <div>
          <img src="#" alt="ingredient"/>
          <img src="#" alt="ingredient"/>
          <img src="#" alt="ingredient"/>
          <img src="#" alt="ingredient"/>
        </div>
        <div>
          <p>460</p>
          <CurrencyIcon type={'primary'} />
        </div>
      </div>
    </section>
  )
}