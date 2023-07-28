import orderStatsStyles from "../order-stats/order-stats.module.css"

export function OrderStats() {

  return (
    <section className={orderStatsStyles.content}>
      <div className={orderStatsStyles.ordersWrapper}>
        <div>
          <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
          <ul className={orderStatsStyles.ordersList}>
            <li className="text text_type_digits-default text_color_success">034533</li>
            <li className="text text_type_digits-default text_color_success">034533</li>
            <li className="text text_type_digits-default text_color_success">034533</li>
            <li className="text text_type_digits-default text_color_success">034533</li>
            <li className="text text_type_digits-default text_color_success">034533</li>
          </ul>
        </div>
        <div>
          <h2 className="text text_type_main-medium pb-6">В работе:</h2>
          <ul  className={orderStatsStyles.ordersList}>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
            <li className="text text_type_digits-default">034533</li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className="text text_type_digits-large">28752</p>
      </div>

      <div>
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className="text text_type_digits-large">138</p>
      </div>
    </section>
  )
}