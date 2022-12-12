using Microsoft.Toolkit.Mvvm.ComponentModel;

namespace Lab6;


[QueryProperty("Day", "Day")]
public partial class DetailsPage : ContentPage
{
	public WeatherDayDetails Day { get; set; }

	public DetailsPage()
	{
		InitializeComponent();

		Loaded += (_, _) =>
		{
			HoursList.ItemsSource = Day.Hours;
		};
	}

    private void BackBtn_Clicked(object sender, EventArgs e)
    {
        Shell.Current.GoToAsync("//home", true);
    }
}