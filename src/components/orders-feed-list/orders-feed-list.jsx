import {OrdersFeedListItem} from "../orders-feed-list-item/orders-feed-list-item";
import ordersFeedListStyles from "../orders-feed-list/orders-feed-list.module.css"

export function OrdersFeedList () {

  return(
    <section>
      <div className={ordersFeedListStyles.ordersList} >
        <OrdersFeedListItem />
        <OrdersFeedListItem />
        <OrdersFeedListItem />
        <OrdersFeedListItem />
      </div>
    </section>
  )
}