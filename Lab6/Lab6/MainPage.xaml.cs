using Newtonsoft.Json;
using Lab6.Domain.Models;
using System.Reflection;

namespace Lab6;
public sealed class WeatherDayDetails
{
    public double MinTemp { get; set; }
    public double MaxTemp { get; set; }
    public string Icon { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public DateTime DateString { get; set; }
    public List<WeatherRecord> Hours { get; set; } = new();

    public string MaxMinTemp => $"Temp: {Math.Round(MinTemp - 273.15)}°C / {Math.Round(MaxTemp - 273.15)}°C";
    public string ImageURL => $"https://openweathermap.org/img/wn/{Icon}@4x.png";
}

public partial class MainPage : ContentPage
{
    public DateTime UnixTimeToDateTime(long unixtime)
    {
        System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
        dtDateTime = dtDateTime.AddMilliseconds(unixtime * 1000).ToLocalTime();
        return dtDateTime;
    }

    public MainPage()
    {
        InitializeComponent();

        var days = new WeatherDayDetails[5];

        var a = Assembly.GetExecutingAssembly().Location;

        a = a.Substring(0, a.LastIndexOf('\\') + 1);
        string json = File.ReadAllText(a + "assets/data.json");

        Forecast forecast = JsonConvert.DeserializeObject<Forecast>(json);

        for (int i = 0; i < days.Length; i++)
        {
            days[i] = new()
            {
                Description = forecast.List[i * 8].Weather[0].description,
                Icon = forecast.List[i * 8].Weather[0].icon,
                MinTemp = forecast.List[i * 8].Main.temp_min,
                MaxTemp = forecast.List[i * 8].Main.temp_max,
                Date = UnixTimeToDateTime(forecast.List[i * 8].Dt),
            };
        }

        for (int i = 0; i < forecast.List.Count; i++)
        {
            WeatherRecord record = forecast.List[i];

            days[i / 8].Hours.Add(record);
        }

        DaysList.ItemsSource = days;
    }

    private void OnCounterClicked(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync("//details");
    }
}

