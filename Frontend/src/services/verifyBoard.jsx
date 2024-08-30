import { GetBoardById } from "./project";

export const VerifyBoardOwner = async (id, user) => {
  const board = await GetBoardById({ id });
  const verifyMemberOwner = board.members.filter(
    (member) => member.member_id.id === user.id
  );
  return verifyMemberOwner.length > 0;
};
