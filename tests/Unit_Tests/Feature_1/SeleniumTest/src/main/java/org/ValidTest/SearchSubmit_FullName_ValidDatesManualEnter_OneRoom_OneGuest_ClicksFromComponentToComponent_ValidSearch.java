package org.ValidTest;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static java.lang.Thread.sleep;
import static org.junit.Assert.assertEquals;

public class SearchSubmit_FullName_ValidDatesManualEnter_OneRoom_OneGuest_ClicksFromComponentToComponent_ValidSearch {
    public static void main(String[] args) throws InterruptedException {
        // Path for Chrome Driver
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\seans\\Downloads\\chromedriver_win32\\chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();

        driver.get("http:localhost:3000/");

        // Type into Searchbar
        WebElement searchBar = driver.findElement(By.id("searchbar"));
        searchBar.sendKeys("Singapore, Singapore");

        // Implicit Wait for Search Options to appear
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));

        // Click Searchbar option
        sleep(2000);
        WebElement searchBarOption = driver.findElement(By.id("Singapore, Singapore"));
        searchBarOption.click();

        // Click on Start Datepicker
        WebElement startDateList = driver.findElement(By.id("startdate"));
        startDateList.click();

        //Delete Current Date
        sleep(2000);
        startDateList.sendKeys(Keys.CONTROL + "a");
        startDateList.sendKeys(Keys.DELETE);

        //Manual Enter
        sleep(2000);
        startDateList.sendKeys("26/07/2022");

        // Click on End Datepicker
        WebElement endDateList = driver.findElement(By.id("enddate"));
        endDateList.click();
        sleep(2000);

        // Click on date on End Datepicker
        endDateList.sendKeys(Keys.CONTROL + "a");
        endDateList.sendKeys(Keys.DELETE);

        //Manual Enter
        sleep(2000);
        endDateList.sendKeys("29/07/2022");

        sleep(2000);
        // Click Submit button
        WebElement submit = driver.findElement(By.id("submit"));
        submit.click();


    }
}
