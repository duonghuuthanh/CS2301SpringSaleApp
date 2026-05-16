/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dht.controllers;

import com.dht.pojo.Comment;
import com.dht.service.CommentService;
import com.dht.service.UserService;
import java.security.Principal;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author huu-thanhduong
 */
@RestController
@RequestMapping("/api")
public class ApiCommentController {
    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;
    
    @GetMapping("/products/{productId}/comments")
    public ResponseEntity<List<Comment>> list(@PathVariable(value = "productId") int id) {
        return new ResponseEntity<>(this.commentService.getComments(id), HttpStatus.OK);
    }
    
    @PostMapping("/secure/products/{productId}/comments")
    public ResponseEntity<Comment> addComment(@RequestBody Comment c, Principal pricipal) {
        c.setUserId(this.userService.getUserByUsername(pricipal.getName()));
        return new ResponseEntity<>(this.commentService.addComment(c), HttpStatus.CREATED);
    }
}
