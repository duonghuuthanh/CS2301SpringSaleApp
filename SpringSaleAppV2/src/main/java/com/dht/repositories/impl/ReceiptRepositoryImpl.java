/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.repositories.impl;

import com.dht.pojo.CartItem;
import com.dht.pojo.OrderDetail;
import com.dht.pojo.SaleOrder;
import com.dht.repositories.ProductRepository;
import com.dht.repositories.ReceiptRepository;
import com.dht.repositories.UserRepository;
import java.util.Date;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author huu-thanhduong
 */
@Repository
@Transactional
public class ReceiptRepositoryImpl implements  ReceiptRepository{

    @Autowired
    private LocalSessionFactoryBean factory;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ProductRepository proRepo;

    @Override
    public void addReceipt(List<CartItem> carts) {
        Session s = this.factory.getObject().getCurrentSession();
        SaleOrder receipt = new SaleOrder();
        receipt.setUserId(this.userRepo.getUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()));
        receipt.setCreatedDate(new Date());
        s.persist(receipt);

        for (var c : carts) {
            OrderDetail d = new OrderDetail();
            d.setQuantity(c.getQuantity());
            d.setUnitPrice(c.getPrice());
            d.setProductId(this.proRepo.getProductById(c.getId()));
            d.setOrderId(receipt);

            s.persist(d);
        }

    }
}
