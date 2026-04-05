///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package com.dht.repositories.impl;
//
//import com.dht.hibernatedemov2.HibernateUtils;
//import com.dht.pojo.CartItem;
//import com.dht.pojo.OrderDetail;
//import com.dht.pojo.SaleOrder;
//import java.util.Date;
//import java.util.List;
//import org.hibernate.Session;
//
///**
// *
// * @author huu-thanhduong
// */
//public class ReceiptRepositoryImpl {
//    public void addReceipt(List<CartItem> carts) {
//        try (Session s = HibernateUtils.getFactory().openSession()) {
//            SaleOrder receipt = new SaleOrder();
//            receipt.setUserId(new UserRepositoryImpl().getUserByUsername("dhthanh"));
//            receipt.setCreatedDate(new Date());
//            s.persist(receipt);
//            
//            for (var c: carts) {
//                OrderDetail d = new OrderDetail();
//                d.setQuantity(c.getQuantity());
//                d.setUnitPrice(c.getPrice());
//                d.setProductId(new ProductRepositoryImpl().getProductById(c.getId()));
//                d.setOrderId(receipt);
//                
//                s.persist(d);
//            }
//        }
//    }
//}
