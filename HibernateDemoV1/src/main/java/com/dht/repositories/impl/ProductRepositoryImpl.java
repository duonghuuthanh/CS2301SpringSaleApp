/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.repositories.impl;

import com.dht.hibernatedemov1.HibernateUtils;
import com.dht.pojo.Product;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.hibernate.Session;
import org.hibernate.query.Query;

/**
 *
 * @author huu-thanhduong
 */
public class ProductRepositoryImpl {

    private static final int PAGE_SIZE = 6;

    public List<Product> getProducts(Map<String, String> params) {
        try (Session session = HibernateUtils.getFACTORY().openSession()) {
            CriteriaBuilder b = session.getCriteriaBuilder();
            CriteriaQuery<Product> q = b.createQuery(Product.class);
            Root root = q.from(Product.class);
            q.select(root);

            if (params != null) {
                List<Predicate> predicates = new ArrayList<>();

                String kw = params.get("kw");
                if (kw != null && !kw.isEmpty()) {
                    predicates.add(b.like(root.get("name"), String.format("%%%s%%", kw)));
                }

                String fromPrice = params.get("fromPrice");
                if (fromPrice != null && !fromPrice.isEmpty()) {
                    predicates.add(b.greaterThanOrEqualTo(root.get("price"), fromPrice));
                }

                String toPrice = params.get("toPrice");
                if (toPrice != null && !toPrice.isEmpty()) {
                    predicates.add(b.lessThanOrEqualTo(root.get("price"), toPrice));
                }

                q.where(predicates.toArray(Predicate[]::new));
            }

            Query query = session.createQuery(q);

            // xu ly phan trang
            if (params != null) {
                int page = Integer.parseInt(params.getOrDefault("page", "1"));
                int start = (page - 1) * PAGE_SIZE;
                
                query.setMaxResults(PAGE_SIZE);
                query.setFirstResult(start);
            }
            
            return query.getResultList();
        }
    }
    
    public Product getProductById(int id) {
        try (Session session = HibernateUtils.getFACTORY().openSession()) {
            return session.get(Product.class, id);
        }
    }
    
    public void addOrUpdateProduct(Product p) {
        try (Session session = HibernateUtils.getFACTORY().openSession()) {
            if (p.getId() != null) {
                session.merge(p);
            } else {
                session.persist(p);
            }
        }
    }
    
    public void deleteProduct(int id) {
        try (Session session = HibernateUtils.getFACTORY().openSession()) { 
            Product p = this.getProductById(id);
            session.remove(p);
        }
    }
}
