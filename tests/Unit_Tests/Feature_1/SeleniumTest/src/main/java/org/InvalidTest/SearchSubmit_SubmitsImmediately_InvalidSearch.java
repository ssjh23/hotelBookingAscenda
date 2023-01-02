package org.InvalidTest;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.Assert.assertEquals;

public class SearchSubmit_SubmitsImmediately_InvalidSearch {
    public static void main(String[] args) {
        // Path for Chrome Driver
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\seans\\Downloads\\chromedriver_win32\\chromedriver.exe");
        ChromeDriver driver = new ChromeDriver();

        driver.get("http:localhost:3000/");

        // Click Submit button
        WebElement submit = driver.findElement(By.id("submit"));
        submit.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        WebElement errorSearch = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("searchbar_error")));

        assertEquals("Please select a location from the list", errorSearch.getText());
    }
}
