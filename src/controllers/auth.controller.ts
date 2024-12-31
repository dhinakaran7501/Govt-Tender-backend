import { Request, Response } from 'express';
import { loginService } from 'services/auth.services';

export const loginController = async (req: Request, res: Response) => {
  try {
    const response = await loginService(req.body);
    res.status(200).json({
      ...response,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error || 'Internal Server Error.',
    });
  }
};
