'use strict';

const express = require('express');

const { foodModel } = require('../models');

const router = express.Router();

router.get('/food', async (req, res, next) => {
  const food = await foodModel.findAll();
  res.status(200).send(food);
});

router.get('/food/:id', async (req, res, next) => {
  const { id } = req.params;
  console.log('food id is: ', id);
  const singleFoodItem = await foodModel.findOne({where: {id}});

  // another way -- find by primary key
  // const singleFoodItem = await foodModel.findByPk(id);
  res.status(200).send(singleFoodItem);
});

router.post('/food', async (req, res, next) => {
  let newFoodItem = await foodModel.create(req.body);
  res.status(200).send(newFoodItem);

});

router.put('/food/:id', async (req, res, next) => {
  const { id } = req.params;
  const itemsMod = await foodModel.update(req.body, {where: {id}});
  res.status(200).send(itemsMod);
});

router.delete('/food/:id', async (req, res, next) => {
  const { id } = req.params;
  const itemsDeleted = await foodModel.destroy(req.body, {where: {id}});
  res.status(200).send(itemsDeleted);
});

module.exports = router;