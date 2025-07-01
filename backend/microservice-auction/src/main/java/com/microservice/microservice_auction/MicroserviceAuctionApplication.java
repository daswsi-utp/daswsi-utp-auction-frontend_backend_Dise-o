package com.microservice.microservice_auction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MicroserviceAuctionApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceAuctionApplication.class, args);
	}

}
