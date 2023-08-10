// creating instance of the webApplicatoinBuilder 
var builder = WebApplication.CreateBuilder(args);

// Add services to the dependency injection container to enable to create http requests 
builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//These lines add services required for generating Swagger/OpenAPI documentation for your API.
//Swagger is a tool that allows you to document and interact with your API endpoints.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//This line adds middleware to redirect HTTP requests to HTTPS for security purposes.
app.UseHttpsRedirection();

//This line adds middleware to handle authorization, which is the process of determining whether
//a user has the necessary permissions to access certain resources.
app.UseAuthorization();


//This line maps the controllers in your application to specific routes, allowing them to handle incoming HTTP requests.
app.MapControllers();


app.Run();

