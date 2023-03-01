import React, { useState, useContext } from "react";
import axios from "axios";
import { fetchStockPrice } from "./Api";
import { useNavigate, useLocation } from "react-router-dom";
import { EmailContext } from "../Context";

const 