import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { trackOrderById } from '../../services/orderService';
import NotFound from '../../components/NotFound/NotFound';
import classes from './orderTrackPage.module.css';
import DateTime from '../../components/DateTime/DateTime';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList';
import Title from '../../components/Title/Title';
import Map from '../../components/Map/Map';

export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();

  useEffect(() => {
  if (orderId) {
    trackOrderById(orderId).then(order => {
      setOrder(order);
    });
  }
}, [orderId]);

  if (!orderId)
    return <NotFound message="Orden no encontrada" linkText="Ir a la pagina de inicio" />;

  return (
    order && (
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Orden #{order.id}</h1>
          <div className={classes.header}>
            <div>
              <strong>Fecha</strong>
              <DateTime date={order.createdAt} />
            </div>
            <div>
              <strong>Nombre</strong>
              {order.name}
            </div>
            <div>
              <strong>Dirección</strong>
              {order.address}
            </div>
            <div>
              <strong>Estado</strong>
              {order.status}
            </div>
            {order.paymentId && (
              <div>
                <strong>Payment ID</strong>
                {order.paymentId}
              </div>
            )}
          </div>

          <OrderItemsList order={order} />
        </div>

        <div>
          <Title title="Tú dirección" fontSize="1.6rem" />
          <Map location={order.addressLatLng} readonly={true} />
        </div>

        {order.status === 'NEW' && (
          <div className={classes.payment}>
            <Link to="/payment">Ir al pago</Link>
          </div>
        )}
      </div>
    )
  );
}
