{
  description = "A flake to set up basic development shells";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    systems = ["x86_64-linux" "x86_64-darwin" "aarch64-linux" "aarch64-darwin"];
    forAllSystems = fn: nixpkgs.lib.genAttrs systems (system: fn system nixpkgs.legacyPackages.${system});
  in {
    devShells = forAllSystems (system: pkgs: {
      default = pkgs.mkShell {
        buildInputs = with pkgs; [
          nodejs_22
        ];
      };
    });
  };
}
