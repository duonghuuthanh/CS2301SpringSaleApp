/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.repositories.impl;

import com.dht.hibernatedemov1.HibernateUtils;
import com.dht.pojo.CartItem;
import com.dht.pojo.OrderDetail;
import com.dht.pojo.SaleOrder;
import java.util.Date;
import java.util.List;
import org.hibernate.Session;

/**
 *
 * @author huu-thanhduong
 */
public class ReceiptRepositoryImpl {
    public void addReceipt(List<CartItem> carts) {
        try (Session session = HibernateUtils.getFACTORY().openSession()) {
            SaleOrder r = new SaleOrder();
            r.setCreatedDate(new Date());
            r.setUserId(new UserRepositoryImpl().getUserByUsername("dhthanh"));
            
            session.persist(r);
            
            for (var c: carts) {
                OrderDetail d = new OrderDetail();
                d.setQuantity(c.getQuantity());
                d.setUnitPrice(c.getPrice());
                d.setProductId(new ProductRepositoryImpl().getProductById(c.getId()));
                d.setOrderId(r);
                
                session.persist(d);
            }
        }
    }
}
