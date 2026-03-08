/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.dht.hibernatedemov2;

import com.dht.repositories.impl.CategoryRepositoryImpl;
import com.dht.repositories.impl.ProductRepositoryImpl;
import com.dht.repositories.impl.StatsRepositoryImpl;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author huu-thanhduong
 */
public class HibernateDemoV2 {

    public static void main(String[] args) {
//        CategoryRepositoryImpl s1 = new CategoryRepositoryImpl();
//        s1.getCates().forEach(c -> System.out.println(c.getName()));

            
//            ProductRepositoryImpl s2 = new ProductRepositoryImpl();
//            
//            Map<String, String> params = new HashMap<>();
//            params.put("page", "2");
//            params.put("kw", "iPhone");
//            params.put("fromPrice", "28000000");
            
//            s2.getProducts(params).forEach(p ->  System.out.printf("%d - %s: %d\n", 
//                    p.getId(), p.getName(), p.getPrice()));

            StatsRepositoryImpl s3 = new StatsRepositoryImpl();
//            s3.statsrevenueByProduct().forEach(o -> System.out.printf("%d - %s: %d\n", o[0], o[1], o[2]));
            s3.statsRevenueByTime("QUARTER", 2020).forEach(o -> System.out.printf("%d: %d\n", o[0], o[1]));
    }
}
