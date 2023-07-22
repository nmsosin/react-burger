import orderStatsStyles from "../order-stats/order-stats.module.css"
export function OrderStats () {

  return(
    <section>
      <div className={orderStatsStyles.ordersWrapper}>
        <div>
          <h2>Готовы:</h2>
          <p>034533</p>
          <p>034533</p>
          <p>034533</p>
          <p>034533</p>
          <p>034533</p>
        </div>
        <div>
          <h2>В работе:</h2>
          <p>034533</p>
          <p>034533</p>
          <p>034533</p>
          <p>034533</p>
        </div>
      </div>
      <div>
        <h2>Выполнено за все время:</h2>
        <p>28752</p>
      </div>

      <div>
        <h2>Выполнено за сегодня:</h2>
        <p>138</p>
      </div>
    </section>
  )
}