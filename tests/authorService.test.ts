import request from "supertest";
import app from "../server";
import Author from "../models/author";

/**
 * Test suite for the GET /authors endpoint
 * Tests the following scenarios:
 * 1. Successfully retrieving a sorted list of authors
 * 2. Handling empty database response
 * 3. Handling server errors
 */
describe("Verify GET /authors", () => {
  let consoleSpy: jest.SpyInstance;

  /**
   * Setup before all tests
   * Mocks console.error to prevent error messages in test output
   */
  beforeAll(() => {
    consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  /**
   * Cleanup after all tests
   * Restores the original console.error functionality
   */
  afterAll(() => {
    consoleSpy.mockRestore();
  });

  /**
   * Test case: Successful retrieval of authors
   * Should return a 200 status code and a sorted list of authors
   */
  it("should respond with a list of authors sorted by family name", async () => {
    const mockAuthors = [
      { name: "John Doe", lifespan: "1990 - 2020" },
      { name: "Jane Doe", lifespan: "1995 - 2021" },
      { name: "Alice Smith", lifespan: "1980 - 2020" },
      { name: "Bob Smith", lifespan: "1985 - 2021" },
      { name: "Charlie Brown", lifespan: "1970 - 2020" },
      { name: "David Brown", lifespan: "1975 - 2021" },
      { name: "Eve Johnson", lifespan: "1960 - 2020" },
      { name: "Frank Johnson", lifespan: "1965 - 2021" },
    ];

    const expectedAuthors = [...mockAuthors].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    Author.getAllAuthors = jest.fn().mockImplementationOnce((sortOpts) => {
      if (sortOpts && sortOpts.family_name === 1) {
        return Promise.resolve(expectedAuthors);
      }
      return Promise.resolve(mockAuthors);
    });

    const response = await request(app).get("/authors");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(expectedAuthors);
  });

  /**
   * Test case: Empty database
   * Should return a 200 status code with "No authors found" message
   */
  it("should respond with 'No authors found' when database is empty", async () => {
    Author.getAllAuthors = jest.fn().mockResolvedValue([]);

    const response = await request(app).get("/authors");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("No authors found");
  });

  /**
   * Test case: Internal Server Error
   * Should return a 500 status code with "Internal Server Error" message
   * Should log the error to console
   */
  it("should respond with status 500 when getAllAuthors throws an error", async () => {
    Author.getAllAuthors = jest
      .fn()
      .mockRejectedValue(new Error("Internal Server Error"));

    const response = await request(app).get("/authors");
    expect(response.statusCode).toBe(500);
    expect(response.text).toBe("Internal Server Error");
    expect(consoleSpy).toHaveBeenCalled();
  });
});
