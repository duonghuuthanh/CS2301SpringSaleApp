/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.repositories.impl;

import com.dht.hibernatedemov1.HibernateUtils;
import com.dht.pojo.Category;
import java.util.List;
import org.hibernate.Session;
import org.hibernate.query.Query;

/**
 *
 * @author huu-thanhduong
 */
public class CategoryRepositoryImpl {
    public List<Category> getCates() {
        try (Session session = HibernateUtils.getFACTORY().openSession()) {
            Query query = session.createQuery("FROM Category", Category.class);
            return query.getResultList();
        }
    }
}
