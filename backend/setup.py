import subprocess
import sys

def setup_virtual_environment():
    # Determine the platform
    is_windows = sys.platform.startswith('win')
    is_linux = sys.platform.startswith('linux')
    is_mac = sys.platform.startswith('darwin')

    # Create a virtual environment in the backend folder
    subprocess.run([sys.executable, "-m", "venv", "venv"])

        # Activate the virtual environment and install the requirements in the same shell
    activate_script = "venv\\Scripts\\activate" if is_mac else ". venv/bin/activate"
    pip_command = "pip" if is_mac else "pip3"
    command = f"{activate_script} && {pip_command} install -r requirements.txt"
    subprocess.run(command, shell=True, text=True)

if __name__ == "__main__":
    setup_virtual_environment()