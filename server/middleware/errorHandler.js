const errorHandler = (err, req, res, next) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
    env: {
      hasAdminUsername: !!process.env.ADMIN_USERNAME,
      hasAdminPassword: !!process.env.ADMIN_PASSWORD,
      hasJwtSecret: !!process.env.JWT_SECRET,
      nodeEnv: process.env.NODE_ENV
    }
  });

  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  
  res.status(statusCode).json({
    error: errorMessage,
    details: process.env.NODE_ENV === 'development' ? err : undefined,
    path: req.path,
    method: req.method
  });
};

export default errorHandler; 