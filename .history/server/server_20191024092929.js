const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const monk = require('monk');

var db = monk('localhost:27017/mydb');