import {OrdersFeedListItem} from "../orders-feed-list-item/orders-feed-list-item";
import ordersFeedListStyles from "../orders-feed-list/orders-feed-list.module.css"
import {TOrder} from "../../utils/types";
import {FC} from "react";

type TOrdersFeedListProps = {
  orders: TOrder[] | undefined;
}

export const OrdersFeedList: FC<TOrdersFeedListProps> = ({orders}) => {

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