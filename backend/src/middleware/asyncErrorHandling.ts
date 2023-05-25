import { Request, Response, NextFunction } from 'express';

// Factory async function creator, it embeds the try/catch block
// required for all function used when defining the request handlers.
// This async function handler factory spares the programmer the need
// to create a try/catch block in all route definitions.
// It passes the control to the next function (in this case the internal server error
// handler), if an error is catched.
export default function asyncErrorHandling(handler: (req: Request, res: Response)=> void) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        await handler(req, res);
      }
      catch(ex) {
        // Pass control to the next middleware function, normally the error handling
        // function registered as the last middleware function.
        next(ex);
      }
    };  
  };