import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import indexRouter from  "./routes/index.js"
import companyRouter from "./routes/company.js"
import employeeRouter from "./routes/employee.js"

var app = express();

// view engine setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/company', companyRouter);
app.use('/employee', employeeRouter);

// error handler
app.use((err, req, res, next)=> {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      details: req.app.get('env') === 'development' ? err.stack : undefined
    }
  });
});


export default app;