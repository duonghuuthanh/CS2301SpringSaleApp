/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.repositories.impl;

import com.dht.hibernatedemov1.HibernateUtils;
import com.dht.pojo.User;
import org.hibernate.Session;
import org.hibernate.query.Query;

/**
 *
 * @author huu-thanhduong
 */
public class UserRepositoryImpl {
    public User getUserByUsername(String username) {
        try (Session session = HibernateUtils.getFACTORY().openSession()) {
            Query q = session.createNamedQuery("User.findByUsername", User.class);
            q.setParameter("username", username);
            
            return (User) q.getSingleResult();
        }
    }
}
