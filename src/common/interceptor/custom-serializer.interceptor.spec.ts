import { ExecutionContext, CallHandler } from "@nestjs/common";
import { of } from "rxjs";
import { CustomSerializerInterceptor } from "./custom-serializer.interceptor";
import { Expose } from "class-transformer";

// Mock DTO
class TestDTO {
  @Expose()
  id: number;
  @Expose()
  name: string;
}

// Mock Data to simulate
const mockData = {
  id: 1,
  name: "Test Name",
  extraField: "Should be excluded",
};

// Expected serialized result
const expectedData = {
  id: 1,
  name: "Test Name",
};

// Test suite
describe("CustomSerializerInterceptor", () => {
  let interceptor: CustomSerializerInterceptor<TestDTO>;
  let executionContext: ExecutionContext;
  let callHandler: CallHandler;

  beforeEach(() => {
    interceptor = new CustomSerializerInterceptor(TestDTO);

    // Mocking ExecutionContext and CallHandler
    executionContext = {} as ExecutionContext;

    // Mock the CallHandler and handle method to return an observable with mock data
    callHandler = {
      handle: jest.fn().mockReturnValue(of(mockData)),
    };
  });

  it("should serialize response data using plainToInstance", (done) => {
    // Call intercept method
    interceptor.intercept(executionContext, callHandler).subscribe((result) => {
      // Verify that plainToInstance was applied and extraField was excluded
      expect(result).toEqual(expectedData);
      done();
    });
  });

  it("should call next.handle", () => {
    interceptor.intercept(executionContext, callHandler);

    // Verify that handle was called once
    expect(callHandler.handle).toHaveBeenCalled();
  });
});
