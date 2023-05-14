var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpClient();
var app = builder.Build();

app.MapGet("/", async (HttpClient httpClient, IConfiguration configuration,
    string firstname, string surname) => {
        var backendHostname = configuration["BACKEND_HOSTNAME"];
        var result = await httpClient.GetAsync($"http://{backendHostname}/profile?firstname={firstname}&surname={surname}");
        var response = await result.Content.ReadFromJsonAsync<BackendResponse>();
        return $"Hi {response!.name}, you're {response!.age} years old";
});

app.Run();

record BackendResponse(string name, int age);
