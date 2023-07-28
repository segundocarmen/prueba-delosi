variable "vLocation" {
    description = "Location of Stack"
    type        = string
    default     = "East US"
}
#<--------------------------------------------------------->
variable "vProject" {
    description = "Project of Stack"
    type        = string
    default     = "scdelosi"
}

variable "vPrefixApp" {
    description = "Prefix of Stack"
    type        = string
    default     = "app"
}
#<--------------------------------------------------------->
variable "vAppPort" {
    description = "Port of App Stack"
    type        = string
    default     = "3000"
}
#<--------------------------------------------------------->
variable "vImageName" {
    description = "Name image Stack"
    type        = string
    default     = "scd-delosi"
}

variable "vImageTag" {
    description = "Tag of image Stack"
    type        = string
    default     = "v2.0"
}