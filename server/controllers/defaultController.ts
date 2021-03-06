import { runQuery } from '../models/dbModel.ts';

import Dex from 'dex';
const dex = Dex({client: 'postgres'});

const defaultController: any = {};

defaultController.getAll = async (ctx: any) => {
  const text = dex.select().from(ctx.state.collectionName).toString();
  const result = await runQuery(text);

  ctx.response.status = 200;
  ctx.response.body = {
    success: true,
    data: result.rows
  };
};

defaultController.getOne = async (ctx: any) => {
  const text = dex.select().from(ctx.state.collectionName).where({ id: ctx.params.id }).toString();
  const result = await runQuery(text);
  
  ctx.response.body = {
    success: true,
    data: result.rows[0]
  };
};

defaultController.create = async (ctx: any) => {
  if (!ctx.request.hasBody) {
    throw new Error('No data');
  }

  const { value } = await ctx.request.body({ type: 'json' });

  const text = dex(ctx.state.collectionName).insert(await value).toString();
  const result = runQuery(text);

  ctx.response.body = {
    success: true
  };
};

defaultController.update = async (ctx: any) => {
  if (!ctx.request.hasBody) {
    throw new Error('No data');
  }

  const { value } = await ctx.request.body({ type: 'json' });

  const text = dex(ctx.state.collectionName).where({ id: ctx.params.id }).update(await value).toString();
  const result = runQuery(text);

  ctx.response.body = {
    success: true
  };
};

defaultController.delete = async (ctx: any) => {
  const text = dex(ctx.state.collectionName).where({ id: ctx.params.id }).delete().toString();
  const result = runQuery(text);

  ctx.response.body = {
    success: true
  };
};

export default defaultController;