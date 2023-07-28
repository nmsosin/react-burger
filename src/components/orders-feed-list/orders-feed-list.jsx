import {OrdersFeedListItem} from "../orders-feed-list-item/orders-feed-list-item";
import ordersFeedListStyles from "../orders-feed-list/orders-feed-list.module.css"

export function OrdersFeedList ({orders}) {

  return(
    <section>
      <div className={ordersFeedListStyles.ordersList} >
        {orders && orders.map((order) => {
          return <OrdersFeedListItem order={order} key={order._id} />
        })}
      </div>
    </section>
  )
}