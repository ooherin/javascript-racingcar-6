import {
  getLogSpy,
  mockQuestions,
  mockRandoms,
} from "../src/testUtils/testUtil.js";
import App from "../src/App.js";

describe("자동차 경주 게임", () => {
  test("전진-정지", async () => {
    //given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ["pobi,woni", "1"];
    const outputs = ["pobi : -"];
    const randoms = [MOVING_FORWARD, STOP];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([...randoms]);
    // when
    const app = new App();
    await app.play();
    // then
    //라운드 별 게임 결과 출력
    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
    //우승자 출력
    const logCalls = logSpy.mock.calls;
    const result = logCalls[logCalls.length - 1][0];
    expect(result).toBe("최종 우승자 : pobi");
  });

  test("전진-전진", async () => {
    // given
    const MOVING_FORWARD = 4;
    const inputs = ["pobi,woni", "1"];
    const outputs = ["pobi : -", "woni : -"];
    const randoms = [MOVING_FORWARD, MOVING_FORWARD];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([...randoms]);

    //when
    const app = new App();
    await app.play();

    //then
    //라운드 별 게임 결과 출력
    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
    //우승자 출력
    const logCalls = logSpy.mock.calls;
    const result = logCalls[logCalls.length - 1][0];

    expect(result).toBe("최종 우승자 : pobi, woni");
  });

  test("정지-전진-전진-정지", async () => {
    // given
    const MOVING_FORWARD = 8;
    const STOP = 1;
    const inputs = ["pobi,woni", "2"];
    const outputs = ["pobi : ", "woni : -", "pobi : -", "woni : -"];
    const randoms = [STOP, MOVING_FORWARD, MOVING_FORWARD, STOP];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([...randoms]);

    //when
    const app = new App();
    await app.play();

    //then
    //라운드 별 게임 결과 출력
    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
    //우승자 출력
    const logCalls = logSpy.mock.calls;
    const result = logCalls[logCalls.length - 1][0];

    expect(result).toBe("최종 우승자 : pobi, woni");
  });

  test("정지-정지-정지-정지", async () => {
    // given
    const MOVING_FORWARD = 9;
    const STOP = 2;
    const inputs = ["pobi,woni", "2"];
    const outputs = ["pobi : ", "woni : "];
    const randoms = [STOP, STOP, STOP, STOP];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([...randoms]);
    //when
    const app = new App();
    await app.play();
    //then
    //라운드 별 게임 결과 출력
    outputs.forEach((output) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(output));
    });
    //우승자 출력
    const logCalls = logSpy.mock.calls;
    const result = logCalls[logCalls.length - 1][0];

    expect(result).toBe("최종 우승자 : pobi, woni");
  });
});
