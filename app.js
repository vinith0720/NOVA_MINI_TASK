import express from 'express';
import cookieParser from 'cookie-parser';

import indexRouter from './routes/index.js';
import companyRouter from './routes/company.js';
import employeeRouter from './routes/employee.js';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/company', companyRouter);
app.use('/employee', employeeRouter);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Invalid JSON syntax',
      message: err.message,
    });
  }
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: 'Multer Error: ' + err.message });
  }

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      message: err.message,
      details: req.app.get('env') === 'development' ? err.stack : undefined,
    },
  });
});

export default app;
