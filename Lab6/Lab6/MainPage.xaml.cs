using Newtonsoft.Json;
using Lab6.Domain.Models;
using System.Reflection;
using Microsoft.Toolkit.Mvvm.Input;
using System.ComponentModel;
using System.Threading.Tasks;
using System.Net;

namespace Lab6;
public partial class WeatherDayDetails : INotifyPropertyChanged
{
    public double MinTemp { get; set; }
    public double MaxTemp { get; set; }
    public string Icon { get; set; }
    public string Description { get; set; }
    public DateTime Date { get; set; }
    public List<WeatherRecord> Hours { get; set; } = new();

    public string DateString => $"{Date.DayOfWeek} {Date.Month}/{Date.Day}/{Date.Year}";
    public string MaxMinTemp => $"Temp: {Math.Round(MinTemp - 273.15)}°C / {Math.Round(MaxTemp - 273.15)}°C";
    public string ImageURL => $"https://openweathermap.org/img/wn/{Icon}@4x.png";

    public event PropertyChangedEventHandler PropertyChanged;


    [ICommand()]
    private void OpenDetails(WeatherDayDetails day)
    {
        Shell.Current.GoToAsync("//details", true, new Dictionary<string, object>
        {
            { "Day", day },
        });
    }
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

        string json = new WebClient().DownloadString("https://api.openweathermap.org/data/2.5/forecast?lat=48.42&lon=26.23&appid=4b1b3fbad45c3a7656c86eb57f421be4");

        Forecast forecast = JsonConvert.DeserializeObject<Forecast>(json);
        var days = new WeatherDayDetails[5];
        
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
}

