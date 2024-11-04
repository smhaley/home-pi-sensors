import AppDataSource from "../../db/data-source";
import { FastifyReply, FastifyRequest } from "fastify";
import { UiSettingsRequest } from "../types/request-types";
import { UiSettings } from "../../entities/ui-settings.entity";

export const getUiSettings = async (
  _request: FastifyRequest,
  reply: FastifyReply
) => {
  const data = await AppDataSource.getRepository<
    InstanceType<typeof UiSettings>
  >(UiSettings)
    .createQueryBuilder()
    .select(["UiSettings.settings as settings"])
    .where(`id = '1'`)
    .getRawOne();

  reply.send({ settings: data?.settings ?? {}});
};

export const upsertUiSettings = async (
  request: UiSettingsRequest,
  reply: FastifyReply
) => {
  const { body } = request;
  const newSettings = new UiSettings(body.settings!);
  await AppDataSource.getRepository(UiSettings).save(newSettings);

  reply.code(204);
};
