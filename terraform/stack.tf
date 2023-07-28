#NEW RESOURCE GROUP
resource "azurerm_resource_group" "resource_group" {
  name     = "${var.vProject}-resource"
  location = var.vLocation
}

#CREATING CONTAINER REGISTRY
resource "azurerm_container_registry" "container_registry" {
  admin_enabled       = true
  location            = var.vLocation
  name                = "${var.vProject}${var.vPrefixApp}container"
  resource_group_name = azurerm_resource_group.resource_group.name
  sku                 = "Basic"
}

#CREATING SERVICE PLAN BACK
resource "azurerm_service_plan" "service_plan_app" {
  name                = "${var.vProject}-${var.vPrefixApp}-service-plan"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_resource_group.resource_group.location
  os_type             = "Linux"
  sku_name            = "B2"
}

#CREATING APPSERVICE BACK
resource "azurerm_linux_web_app" "web_app" {
  name                = "${var.vProject}-${var.vPrefixApp}-application"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_service_plan.service_plan_app.location
  service_plan_id     = azurerm_service_plan.service_plan_app.id

  app_settings = {
    # # # "DOCKER_REGISTRY_SERVER_URL"            = "https://mcr.microsoft.com" #ACR_URL
    # # # "DOCKER_CUSTOM_IMAGE_NAME"              = "${acr.login_server}/${var.vImageName}:${var.vImageTag}" #ONLY_ACR
    "DOCKER_REGISTRY_SERVER_USERNAME"       = azurerm_container_registry.container_registry.admin_username #ONLY_PRIV_ACR
    "DOCKER_REGISTRY_SERVER_PASSWORD"       = azurerm_container_registry.container_registry.admin_password #ONLY_PRIV_ACR
    "WEBSITES_PORT"                         = var.vAppPort #ONLY_APP_DOCKER_USE_PORT
    "WEBSITES_ENABLE_APP_SERVICE_STORAGE"   = "false"
  }


  site_config {
    application_stack {
      node_version     = "16-lts"
      docker_image     = "${azurerm_container_registry.container_registry.login_server}/${var.vImageName}"
      # docker_image     = "jackofallops/azure-containerapps-python-acctest"  # DOCKER_HUB_IMAGE
      docker_image_tag = var.vImageTag
    }
  }
}



###CONFIGURE_SERVER_PARAMS
    ### require_secure_transport=OFF