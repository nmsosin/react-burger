import {OrdersFeedListItem} from "../orders-feed-list-item/orders-feed-list-item";

export function OrdersFeedList () {

  return(
    <section>
      <div>
        <OrdersFeedListItem />
        <OrdersFeedListItem />
        <OrdersFeedListItem />
        <OrdersFeedListItem />
      </div>
    </section>
  )
}